package graph

import "graphql_estudos/graph/database"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	CategoryDB *database.CategoryDB
	CourseDB   *database.CourseDB
}
