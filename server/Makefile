#----------------Actions --------------------------------------------------


.PHONY: up down build test

up: ## Start all containers
	docker compose up
down: ## Stop all containers
	docker compose down
build: ## Build image	
	docker compose build --no-cache
test-e2e: ## Run tests inside the app container
	docker compose exec -T nest-backend yarn test:e2e --detectOpenHandles
