import Navbar from "../components/Navbar";

const Dashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-content">

        <div className="dashboard-header">

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back,{" "}
            {user?.firstName || user?.username || "User"}!
          </p>

        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon">
              👤
            </div>

            <div>
              <h3>
                Profile
              </h3>

              <p>
                Manage your profile
              </p>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              📊
            </div>

            <div>
              <h3>
                Activity
              </h3>

              <p>
                View your activity
              </p>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              ⚙️
            </div>

            <div>
              <h3>
                Settings
              </h3>

              <p>
                Manage your settings
              </p>
            </div>

          </div>

        </div>

        <div className="profile-card">

          <h2>
            Account Information
          </h2>

          <div className="profile-grid">

            <div>
              <span>
                Name
              </span>

              <strong>
                {user?.firstName || "User"}{" "}
                {user?.lastName || ""}
              </strong>
            </div>

            <div>
              <span>
                Username
              </span>

              <strong>
                {user?.username || "N/A"}
              </strong>
            </div>

            <div>
              <span>
                Email
              </span>

              <strong>
                {user?.email || "N/A"}
              </strong>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;