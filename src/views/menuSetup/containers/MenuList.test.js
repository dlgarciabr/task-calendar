import React from "react";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor, act } from "../../../utils/test-utils";
import mockAxios from "axios";

import MenuList from "./MenuList";
import { menuItems } from "../../../components/Menu";
import messages from "../../../utils/messages";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Setup de menus x grupo AD", () => {
  test("Exibir no grid todos menus existentes no sistema", () => {
    render(<MenuList menuItems={menuItems} />);
    expect(
      screen.getByRole("heading", { name: "Setup menus" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Nome do menu" })
    ).toBeInTheDocument();

    menuItems.forEach(({ label }) => {
      expect(
        screen.getAllByText(label).find((node) => node.tagName === "TD")
      ).toBeInTheDocument();
    });
  });

  test("Verificar se a janela de grupos exibe os grupos existentes", async () => {
    const dialogTitle = "Vínculo entre menu e grupos do AD";
    const currentMenu = menuItems[0];

    render(<MenuList menuItems={menuItems} />);

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: [],
        },
      })
    );

    const buttonEditRules = screen
      .getAllByText(currentMenu.label)
      .find((node) => node.tagName === "TD").nextElementSibling
      .firstElementChild.firstElementChild;

    userEvent.click(buttonEditRules);

    expect(await screen.findByText(dialogTitle)).toBeInTheDocument();

    expect(
      screen.queryByRole("cell", {
        name: messages.GRID_EMPTY_DATA_SOURCE_MESSAGE,
      })
    ).not.toBeInTheDocument();
  });

  test("Abrir janela de grupos e vincular um grupo existente ao menu", async () => {
    const groupName = "NATIONS\\perfil_admin";
    const dialogTitle = "Vínculo entre menu e grupos do AD";
    const currentMenu = menuItems[0];

    render(<MenuList menuItems={menuItems} />);

    await new Promise((r) => setTimeout(r, 1000));

    //request on App component
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                menuCode: "AAA",
                groupName,
              },
              {
                id: 1245234,
                menuCode: "BER",
                groupName: "NATIONS\\Usuários do domínio",
              },
            ],
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                menuCode: "AAA",
                groupName,
              },
              {
                id: 2,
                menuCode: currentMenu.code,
                groupName,
              },
              {
                id: 1245234,
                menuCode: "BER",
                groupName: "NATIONS\\Usuários do domínio",
              },
            ],
          },
        })
      );

    const buttonEditRules = screen
      .getAllByText(currentMenu.label)
      .find((node) => node.tagName === "TD").nextElementSibling
      .firstElementChild.firstElementChild;

    // act(() => userEvent.click(buttonEditRules));
    userEvent.click(buttonEditRules);

    expect(await screen.findByText(dialogTitle)).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    const columnGroupName1stTime = screen.getByText(groupName);

    // const gridLinesQuantity =
    //   columnGroupName1stTime.parentNode.parentNode.childElementCount;

    // expect(gridLinesQuantity).toBe(2);

    expect(columnGroupName1stTime).toBeInTheDocument();

    const groupCheckbox =
      columnGroupName1stTime.previousElementSibling.firstElementChild
        .firstElementChild.firstElementChild;

    // act(() => userEvent.click(groupCheckbox));
    userEvent.click(groupCheckbox);

    expect(groupCheckbox).toHaveProperty("checked", true);

    // act(() => userEvent.click(screen.getByRole("button", { name: "Salvar" })));
    userEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(mockAxios.post).toHaveBeenCalledTimes(1);

    expect(mockAxios.post).toHaveBeenLastCalledWith(
      `${process.env.REACT_APP_API_URL}/rule`,
      [
        {
          id: null,
          menuCode: currentMenu.code,
          groupName,
          deleted: false,
        },
      ]
    );

    await waitFor(() =>
      expect(screen.queryByText(dialogTitle)).not.toBeInTheDocument()
    );

    // act(() => userEvent.click(buttonEditRules));
    userEvent.click(buttonEditRules);

    expect(await screen.findByText(dialogTitle)).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(4);

    const columnGroupName2ndTime = screen.getByText(groupName);

    expect(columnGroupName2ndTime).toBeInTheDocument();

    expect(
      columnGroupName2ndTime.previousElementSibling.firstElementChild
        .firstElementChild.firstElementChild
    ).toHaveProperty("checked", true);
  });

  test("Abrir janela de grupos e desvincular um grupo existente de um menu", async () => {
    const groupName = "NATIONS\\perfil_admin";
    const dialogTitle = "Vínculo entre menu e grupos do AD";
    const currentMenu = menuItems[0];

    render(<MenuList menuItems={menuItems} />);

    await new Promise((r) => setTimeout(r, 1000));

    //request on App component
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 2,
                menuCode: currentMenu.code,
                groupName,
              },
              {
                id: 1245234,
                menuCode: menuItems[1],
                groupName: "NATIONS\\Usuários do domínio",
              },
            ],
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                menuCode: "AAA",
                groupName,
              },
              {
                id: 1245234,
                menuCode: "BER",
                groupName: "NATIONS\\Usuários do domínio",
              },
            ],
          },
        })
      );

    const buttonEditRules = screen
      .getAllByText(currentMenu.label)
      .find((node) => node.tagName === "TD").nextElementSibling
      .firstElementChild.firstElementChild;

    userEvent.click(buttonEditRules);

    expect(await screen.findByText(dialogTitle)).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    const columnGroupName1stTime = screen.getByText(groupName);

    // const gridLinesQuantity =
    //   columnGroupName1stTime.parentNode.parentNode.childElementCount;

    // expect(gridLinesQuantity).toBe(2);

    expect(columnGroupName1stTime).toBeInTheDocument();

    const groupCheckbox =
      columnGroupName1stTime.previousElementSibling.firstElementChild
        .firstElementChild.firstElementChild;

    expect(groupCheckbox).toHaveProperty("checked", true);

    userEvent.click(groupCheckbox);

    expect(groupCheckbox).toHaveProperty("checked", false);

    act(() => userEvent.click(screen.getByRole("button", { name: "Salvar" })));

    expect(mockAxios.post).toHaveBeenLastCalledWith(
      `${process.env.REACT_APP_API_URL}/rule`,
      [
        {
          id: 2,
          menuCode: currentMenu.code,
          groupName,
          deleted: true,
        },
      ]
    );

    expect(mockAxios.post).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(screen.queryByText(dialogTitle)).not.toBeInTheDocument()
    );

    userEvent.click(buttonEditRules);

    expect(await screen.findByText(dialogTitle)).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(4);

    const columnGroupName2ndTime = screen.getByText(groupName);

    expect(columnGroupName2ndTime).toBeInTheDocument();

    expect(
      columnGroupName2ndTime.previousElementSibling.firstElementChild
        .firstElementChild.firstElementChild
    ).toHaveProperty("checked", false);
  });
});
