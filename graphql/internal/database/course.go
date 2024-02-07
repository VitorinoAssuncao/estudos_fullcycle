package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type CourseDB struct {
	db *sql.DB
}

type Course struct {
	ID          string
	Name        string
	Description string
	CategoryID  string
}

func NewCourseDB(db *sql.DB) *CourseDB {
	return &CourseDB{
		db: db,
	}
}

func (c *CourseDB) Create(name, description, categoryID string) (Course, error) {
	uuid, _ := uuid.NewV7()

	id := uuid.String()

	_, err := c.db.Exec(`INSERT INTO courses (id, name, description, category_id) VALUES ($1, $2, $3, $4)`,
		id, name, description, categoryID)
	if err != nil {
		return Course{}, err
	}

	return Course{
		ID:          id,
		Name:        name,
		Description: description,
		CategoryID:  categoryID,
	}, nil
}

func (c *CourseDB) List() ([]Course, error) {
	query := `select id, name, description, category_id from courses`
	rows, err := c.db.Query(query)
	if err != nil {
		return nil, nil
	}
	defer rows.Close()

	courses := make([]Course, 0)

	for rows.Next() {
		var course Course
		if err := rows.Scan(&course.ID, &course.Name, &course.Description, &course.CategoryID); err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return courses, nil
}
