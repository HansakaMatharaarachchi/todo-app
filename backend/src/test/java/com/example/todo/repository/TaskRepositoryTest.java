package com.example.todo.repository;

import com.example.todo.model.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DisplayName("Task Repository Tests")
class TaskRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TaskRepository taskRepository;

    private List<Task> completedTasks;
    private List<Task> incompleteTasks;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll();

        completedTasks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            completedTasks.add(createTask("Completed Task " + i, "Description " + i, true));
        }

        incompleteTasks = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            incompleteTasks.add(createTask("Incomplete Task " + i, "Description " + i, false));
        }

        completedTasks.forEach(entityManager::persist);
        incompleteTasks.forEach(entityManager::persist);
        entityManager.flush();
    }

    private Task createTask(String title, String description, boolean isCompleted) {
        return new Task(title, description, isCompleted);
    }

    @Nested
    @DisplayName("Find By Completion Status Tests")
    class FindByIsCompletedTests {
        @Test
        @DisplayName("Should find all completed tasks")
        void shouldFindAllCompletedTasks() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Task> result = taskRepository.findByIsCompleted(true, pageable);

            assertThat(result).isNotNull();
            assertThat(result.getTotalElements()).isEqualTo(completedTasks.size());
            assertThat(result.getContent())
                    .extracting(Task::getIsCompleted)
                    .containsOnly(true);

            List<Long> resultIds = result.getContent().stream().map(Task::getId).toList();
            List<Long> expectedIds = completedTasks.stream().map(Task::getId).toList();

            assertThat(resultIds).containsExactlyInAnyOrderElementsOf(expectedIds);
        }

        @Test
        @DisplayName("Should find all incomplete tasks")
        void shouldFindAllIncompleteTasks() {
            Pageable pageable = PageRequest.of(0, 10);
            Page<Task> result = taskRepository.findByIsCompleted(false, pageable);

            assertThat(result).isNotNull();
            assertThat(result.getTotalElements()).isEqualTo(incompleteTasks.size());
            assertThat(result.getContent())
                    .extracting(Task::getIsCompleted)
                    .containsOnly(false);

            List<Long> resultIds = result.getContent().stream().map(Task::getId).toList();
            List<Long> expectedIds = incompleteTasks.stream().map(Task::getId).toList();

            assertThat(resultIds).containsExactlyInAnyOrderElementsOf(expectedIds);
        }
    }

    @Nested
    @DisplayName("Pagination Tests")
    class PaginationTests {
        @Test
        @DisplayName("Should return correct page sizes and numbers")
        void shouldReturnCorrectPagination() {
            int pageSize = 2;

            Pageable firstPage = PageRequest.of(0, pageSize);
            Pageable secondPage = PageRequest.of(1, pageSize);

            Page<Task> firstPageResult = taskRepository.findByIsCompleted(true, firstPage);
            Page<Task> secondPageResult = taskRepository.findByIsCompleted(true, secondPage);

            assertThat(firstPageResult.getNumber()).isZero();
            assertThat(firstPageResult.getSize()).isEqualTo(pageSize);
            assertThat(firstPageResult.getContent()).hasSize(pageSize);

            assertThat(secondPageResult.getNumber()).isEqualTo(1);
            assertThat(secondPageResult.getContent()).hasSize(pageSize);

            assertThat(firstPageResult.getTotalElements()).isEqualTo(completedTasks.size());

            int expectedPages = (int) Math.ceil((double) completedTasks.size() / pageSize);

            assertThat(firstPageResult.getTotalPages()).isEqualTo(expectedPages);
        }

        @Test
        @DisplayName("Should return empty page when page number exceeds total pages")
        void shouldReturnEmptyPageWhenExceedingTotalPages() {
            int totalPages = (int) Math.ceil((double) completedTasks.size() / 2);

            Pageable exceedingPage = PageRequest.of(totalPages + 1, 2);
            Page<Task> result = taskRepository.findByIsCompleted(true, exceedingPage);

            assertThat(result.getContent()).isEmpty();
            assertThat(result.getTotalElements()).isEqualTo(completedTasks.size());
        }
    }

    @Nested
    @DisplayName("Sorting By CreatedAt Tests")
    class SortingByCreatedAtTests {
        @BeforeEach
        void setUpSortingByCreatedAtData() {
            taskRepository.deleteAll();

            List<Task> tasksWithDifferentCreationTimes = List.of(
                    new Task("Oldest Task", "Description", true),
                    new Task("Middle Task", "Description", true),
                    new Task("Newest Task", "Description", true)
            );

            tasksWithDifferentCreationTimes.forEach(entityManager::persist);
            entityManager.flush();
        }

        @Test
        @DisplayName("Should sort by createdAt in ascending order")
        void shouldSortByCreatedAtAscending() {
            Pageable pageable = PageRequest.of(0, 10, Sort.by("createdAt").ascending());
            Page<Task> result = taskRepository.findByIsCompleted(true, pageable);

            List<String> titles = result.getContent().stream()
                    .map(Task::getTitle)
                    .toList();

            assertThat(titles).containsExactly(
                    "Oldest Task", "Middle Task", "Newest Task"
            );
        }

        @Test
        @DisplayName("Should sort by createdAt in descending order")
        void shouldSortByCreatedAtDescending() {
            Pageable pageable = PageRequest.of(0, 10, Sort.by("createdAt").descending());
            Page<Task> result = taskRepository.findByIsCompleted(true, pageable);

            List<String> titles = result.getContent().stream()
                    .map(Task::getTitle)
                    .toList();

            assertThat(titles).containsExactly(
                    "Newest Task", "Middle Task", "Oldest Task"
            );
        }
    }

    @Nested
    @DisplayName("Edge Case Tests")
    class EdgeCaseTests {
        @Test
        @DisplayName("Should return empty result when no matching tasks exist")
        void shouldReturnEmptyResultWhenNoMatchingTasksExist() {
            taskRepository.deleteAll();

            List<Task> tasks = new ArrayList<>();

            for (int i = 0; i < 3; i++) {
                tasks.add(createTask("Task " + i, "Description", false));
            }

            tasks.forEach(entityManager::persist);
            entityManager.flush();

            Pageable pageable = PageRequest.of(0, 10);
            Page<Task> result = taskRepository.findByIsCompleted(true, pageable);

            assertThat(result.getTotalElements()).isZero();
            assertThat(result.getContent()).isEmpty();
        }
    }
}