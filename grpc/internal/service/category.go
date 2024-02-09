package service

import (
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/VitorinoAssuncao/estudos_fullcycle/grpc/internal/database"
	"github.com/VitorinoAssuncao/estudos_fullcycle/grpc/internal/pb"
)

type CategoryService struct {
	pb.UnimplementedCategoryServiceServer
	CategoryDB database.CategoryDB
}

func NewCategoryService(categoryDB database.CategoryDB) *CategoryService {
	return &CategoryService{
		CategoryDB: categoryDB,
	}
}

func (c *CategoryService) CreateCategory(ctx context.Context, input *pb.CreateCategoryRequest) (*pb.CategoryResponse, error) {
	category, err := c.CategoryDB.Create(input.Name, input.Description)
	if err != nil {
		return nil, err
	}

	return &pb.CategoryResponse{
		Category: &pb.Category{
			Id:          category.ID,
			Name:        category.Name,
			Description: category.Description,
		},
	}, nil
}

func (c *CategoryService) CreateCategoryStream(stream pb.CategoryService_CreateCategoryStreamServer) error {
	categories := make([]*pb.Category, 0)

	for {
		input, err := stream.Recv()
		if err != nil {
			if errors.Is(err, io.EOF) {
				break
			}

			return err
		}

		newCategory, err := c.CategoryDB.Create(input.Name, input.Description)
		if err != nil {
			return err
		}

		categories = append(categories, &pb.Category{
			Id:          newCategory.ID,
			Name:        newCategory.Name,
			Description: newCategory.Description,
		})
	}

	return stream.SendAndClose(&pb.CategoryList{
		Categories: categories,
	})
}

func (c *CategoryService) CreateCategoryStreamBidirectional(stream pb.CategoryService_CreateCategoryStreamBidirectionalServer) error {
	for {
		input, err := stream.Recv()
		if err != nil {
			if errors.Is(err, io.EOF) {
				break
			}

			return err
		}

		category, err := c.CategoryDB.Create(input.Name, input.Description)
		if err != nil {
			return err
		}

		err = stream.Send(&pb.Category{
			Id:          category.ID,
			Name:        category.Name,
			Description: category.Description,
		})
		if err != nil {
			return nil
		}
	}

	fmt.Println("end of stream")
	return nil
}

func (c *CategoryService) GetCategory(ctx context.Context, input *pb.GetCategoryRequest) (*pb.Category, error) {
	categories, err := c.CategoryDB.List()
	if err != nil {
		return nil, err
	}

	for _, c := range categories {
		if c.ID == input.CategoryId {
			return &pb.Category{
				Id:          c.ID,
				Name:        c.Name,
				Description: c.Description,
			}, nil
		}
	}

	return nil, fmt.Errorf("category not found")
}

func (c *CategoryService) ListCategories(ctx context.Context, _ *pb.Blank) (*pb.CategoryList, error) {
	categories, err := c.CategoryDB.List()
	if err != nil {
		return nil, err
	}

	categoriesList := make([]*pb.Category, 0, len(categories))

	for _, c := range categories {
		categoriesList = append(categoriesList, &pb.Category{
			Id:          c.ID,
			Name:        c.Name,
			Description: c.Description,
		})
	}

	return &pb.CategoryList{
		Categories: categoriesList,
	}, nil
}
