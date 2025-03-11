-- schema.sql
CREATE DATABASE IF NOT EXISTS gantt_chart;
USE gantt_chart;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('task', 'milestone', 'event') NOT NULL,
    start DATE,
    end DATE,
    progress TINYINT(3) UNSIGNED CHECK (progress BETWEEN 0 AND 100),
    isDisabled BOOLEAN DEFAULT FALSE,
    styles VARCHAR(255),
    dependencies VARCHAR(255)
);

TRUNCATE TABLE tasks;

INSERT INTO tasks (task_id, name, type, start, end, progress, isDisabled, styles, dependencies) VALUES
('p_1', 'Project1', "task", '2025-2-1', '2025-2-28', 10, False, '', '[]');