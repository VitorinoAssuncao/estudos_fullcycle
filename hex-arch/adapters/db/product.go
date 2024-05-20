package db

import (
	"database/sql"
	"go-hexagonal/application"

	_ "github.com/mattn/go-sqlite3"
)

type ProductDB struct {
	DB *sql.DB
}

func (p *ProductDB) Get(id string) (application.ProductInterface, error) {
	var product application.ProductEntity
	stmt, err := p.DB.Prepare("SELECT id, name, price, status FROM products WHERE id = ?")
	if err != nil {
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(&product.ID, &product.Name, &product.Price, &product.Status)
	if err != nil {
		return nil, err
	}

	return &product, nil
}
