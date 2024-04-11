import { getConnection } from "@/lib/connection";

const page = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM core_user WHERE idst = ? `,
      [14834]
    );
    const user = (rows as any)[0];

    return (
      <div>
        {user ? (
          <div>
            <p>ID: {user?.idst}</p>
            <p>Username: {user?.userid}</p>
            <p>Firstname: {user?.firstname}</p>
            <p>Lastname: {user?.lastname}</p>
            <p>E-Mail: {user?.email}</p>
            <p>
              Register Date:{" "} 
              {user?.register_date
                ? new Date(user?.register_date).toLocaleString()
                : ""}
            </p>
            <p>
              Last Access: {" "} 
              {user?.lastenter
                ? new Date(user?.lastenter).toLocaleString()
                : ""}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  } finally {
    connection.release();
  }
};

export default page;
