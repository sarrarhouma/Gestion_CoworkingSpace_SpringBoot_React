# 🏢 Gestion Coworking Space - Spring Boot + React 🌐

## 📖 Description
This project provides a **backend REST API** architecture built with **Spring Boot** and a **React-based user interface**.  
It enables the management of coworking spaces through secure endpoints and a modern user interface.

---

## 🌟 Features
### 🔧 Backend
- CRUD operations for key entities: **Members**, **Subscriptions**, **Reservations**, **Rooms**.
- Authentication and Authorization: **Role-based access** (Admin/User).
- Built with **Spring Boot** and **Spring Security**.

### 💻 Frontend
- A sleek **React-based user interface**.
- **Dynamic data rendering** via API calls.
- **Role-based UI customization** for Admins and Users.

---

## 🛠️ Technologies Used
| **Technology**     | **Usage**                    |
|---------------------|------------------------------|
| **Spring Boot**     | Backend development         |
| **Spring Security** | Authentication & Authorization |
| **React**           | Frontend development        |
| **MySQL**           | Database management         |
| **TailwindCSS**/**Bootstrap** | UI styling       |
| **Maven**/**npm**   | Dependency management       |

---

## 📦 Installation & Setup

### 🔧 Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/sarrarhouma/Gestion_CoworkingSpace_SpringBoot_React.git
   cd GestionCoworkingSpace_API
2. **Run the backend**:

 ```bash
    mvn spring-boot:run  
```
3. **The backend API will be live at**: http://localhost:8081.

  ### 🎨 Frontend Setup
  
1. **Navigate to the frontend directory**:

cd ../frontend-coworking-space

2. **Install dependencies**:
 ```bash
npm install
```
3. **Start the React application**:
 ```bash
npm start
```
4. **The frontend will be live at**: http://localhost:3000.
   
  ### 🔑 Default Users
| **Username**        | **Password**                 |
|---------------------|------------------------------|
| **admin**           | admin123                     |
| **user**            | user123                      |

  ### 📚 API Endpoints
🔑 **Authentication**
POST /login: User login.
