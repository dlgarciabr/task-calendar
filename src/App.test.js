import React from "react";
import userEvent from "@testing-library/user-event";

import { render, screen, APP_COMPONENT_KEY } from "./utils/test-utils";
import mockAxios from "axios";
import App from "./App";

import { menuItems } from "./components/Menu";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Funcionalidades básicas", () => {
  test("Exibir menu lateral fechado inicialmente", async () => {
    //arrange
    //act
    const { container } = render(<App key={APP_COMPONENT_KEY} />);

    //assert
    expect(
      container.querySelector("[class*=makeStyles-drawerPaperClose]")
    ).toBeInTheDocument(); //deve ser evitado ao maximo
  });

  test("Exibir barra de titulo com nome do usuário logado", async () => {
    //arrange
    const username = "usuario";
    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              name: username,
            },
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [],
          },
        })
      );

    //act
    render(<App key={APP_COMPONENT_KEY} />);

    //assert
    expect(screen.getByText(/All Nations/i)).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    expect(await screen.findByText(username)).toBeInTheDocument();
  });
});

describe("Controle de acessso", () => {
  test("Bloquear acesso a usuario sem vinculo a um grupo pelo menu", async () => {
    //arrange
    const menuCode = "SETUP_MENUS";
    const adGroupName = "NATIONS\\Grupo";
    const adGroupNameUser = "NATIONS\\OutroGrupo";
    const currentMenuLabel = menuItems.find((m) => m.code === menuCode).label;

    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              name: "usuario",
              groups: [adGroupNameUser],
            },
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                menuCode: menuCode,
                groupName: adGroupName,
              },
            ],
          },
        })
      );

    //act
    render(<App key={APP_COMPONENT_KEY} />);
    await new Promise((r) => setTimeout(r, 1000));

    //assert
    expect(
      screen.queryByRole("button", {
        name: currentMenuLabel,
      })
    ).not.toBeInTheDocument();
  });

  test("Acessar a tela de Administração de menus e grupos do AD", async () => {
    //arrange
    const menuCode = "SETUP_MENUS";
    const adGroupName = "NATIONS\\Grupo";
    const currentMenuLabel = menuItems.find((m) => m.code === menuCode).label;

    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: {
              name: "usuario",
              groups: [adGroupName],
            },
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                menuCode: menuCode,
                groupName: adGroupName,
              },
            ],
          },
        })
      );

    //act
    render(<App key={APP_COMPONENT_KEY} />);
    await new Promise((r) => setTimeout(r, 1000));

    //assert
    const menuItemSetupMenu = screen.getByRole("button", {
      name: currentMenuLabel,
    });
    userEvent.click(menuItemSetupMenu);

    expect(
      screen.getByRole("heading", { name: currentMenuLabel })
    ).toBeInTheDocument();
  });

  test.todo("Bloquear acesso a usuario sem vinculo a um grupo pela url");
  test.todo("Acessar a tela de Confirmação de custos de importação");
  test.todo("Acessar a tela de Volumes de pedido de venda");
});
