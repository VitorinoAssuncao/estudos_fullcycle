package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type CategoryDB struct {
	db *sql.DB
}

type Category struct {
	ID          string
	Name        string
	Description string
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{
		db: db,
	}
}

func (c *CategoryDB) Create(name, description string) (Category, error) {
	uuid, _ := uuid.NewV7()

	id := uuid.String()

	_, err := c.db.Exec(`INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)`,
		id, name, description)
	if err != nil {
		return Category{}, err
	}

	return Category{
		ID:          id,
		Name:        name,
		Description: description,
	}, nil
}

func (c *CategoryDB) List() ([]Category, error) {
	query := `select id, name, description from categories`
	rows, err := c.db.Query(query)
	if err != nil {
		return nil, nil
	}
	defer rows.Close()

	categories := make([]Category, 0)

	for rows.Next() {
		var category Category
		if err := rows.Scan(&category.ID, &category.Name, &category.Description); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}
