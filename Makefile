.PHONY: dev stop clean db frontend backend status

dev: db backend frontend

db:
	docker compose up -d

frontend:
	cd frontend && pnpm install --frozen-lockfile 2>/dev/null || cd frontend && pnpm install
	cd frontend && pnpm start &

backend:
	cd backend && ./mvnw spring-boot:run &

stop:
	-pkill -f "react-scripts" 2>/dev/null
	-pkill -f "spring-boot:run" 2>/dev/null
	docker compose down

clean: stop
	docker compose down -v
	rm -rf frontend/node_modules frontend/build
	rm -rf backend/target

status:
	@echo "=== Docker ==="
	@docker compose ps
	@echo ""
	@echo "=== Ports ==="
	@lsof -i :3000 -i :5432 -i :8080 2>/dev/null | grep LISTEN || echo "No services running"
