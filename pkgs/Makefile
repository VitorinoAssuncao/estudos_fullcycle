coverage:
	@echo "==> Removing..: old coverage files"
	@rm -f coverage.*
	@echo "==> Running...: tests coverage"
	## Remove GOEXPERIMENT flag after coverage redesign is fixed
	@GOEXPERIMENT=nocoverageredesign go test -race -failfast -coverprofile=coverage.temp ./...
	@echo "==> Generating: coverage files"
	@cat coverage.temp | grep -v -e "_test.go" -e "_mock.go" -e ".gen.go" -e "handler.go" -e "usecase.go" > coverage.out
	@go tool cover -html=coverage.out -o coverage.html
	@echo "==> Reporting.: total coverage %"
	@go tool cover -func=coverage.out | grep total: | grep -Eo '[0-9]+\.[0-9]+' > coverage.total
	@head -n 1 coverage.total