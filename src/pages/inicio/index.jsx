const InicioPage = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
};

export default InicioPage;
