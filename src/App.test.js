import React from "react";
import userEvent from "@testing-library/user-event";

// import { render, screen, APP_COMPONENT_KEY } from "rea";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Funcionalidades básicas", () => {
  // test("Exibir menu lateral fechado inicialmente", async () => {
  //   //arrange
  //   //act
  //   const { container } = render(<App key={APP_COMPONENT_KEY} />);
  //   //assert
  //   expect(
  //     container.querySelector("[class*=makeStyles-drawerPaperClose]")
  //   ).toBeInTheDocument(); //deve ser evitado ao maximo
  // });
  // test("Exibir barra de titulo com nome do usuário logado", async () => {
  //   //arrange
  //   const username = "usuario";
  //   mockAxios.get
  //     .mockImplementationOnce(() =>
  //       Promise.resolve({
  //         data: {
  //           data: {
  //             name: username,
  //           },
  //         },
  //       })
  //     )
  //     .mockImplementationOnce(() =>
  //       Promise.resolve({
  //         data: {
  //           data: [],
  //         },
  //       })
  //     );
  //   //act
  //   render(<App key={APP_COMPONENT_KEY} />);
  //   //assert
  //   expect(screen.getByText(/All Nations/i)).toBeInTheDocument();
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  //   expect(await screen.findByText(username)).toBeInTheDocument();
  // });
});
