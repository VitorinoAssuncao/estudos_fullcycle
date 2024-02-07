package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"graphql_estudos/graph"
	"graphql_estudos/graph/database"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

	_ "github.com/mattn/go-sqlite3"
)

const defaultPort = "8080"

func main() {

	db, err := sql.Open("sqlite3", "data.db")
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}

	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		CategoryDB: database.NewCategoryDB(db),
		CourseDB:   database.NewCourseDB(db),
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
