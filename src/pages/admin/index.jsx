const AdminMainPage = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/admin/dashboard",
      permanent: false,
    },
  };
};

export default AdminMainPage;
