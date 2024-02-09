package main

import (
	"database/sql"
	"fmt"
	"net"

	"github.com/VitorinoAssuncao/estudos_fullcycle/grpc/internal/database"
	"github.com/VitorinoAssuncao/estudos_fullcycle/grpc/internal/pb"
	"github.com/VitorinoAssuncao/estudos_fullcycle/grpc/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./db.sqlite")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	categoryService := service.NewCategoryService(*database.NewCategoryDB(db))

	grpcServer := grpc.NewServer()
	grpcServer.RegisterService(&pb.CategoryService_ServiceDesc, categoryService)
	reflection.Register(grpcServer)

	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		panic(err)
	}
	fmt.Printf("starting server on port 50051")
	if err := grpcServer.Serve(listener); err != nil {
		panic(err)
	}
}
