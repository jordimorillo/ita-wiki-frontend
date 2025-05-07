import { render, screen } from "@testing-library/react";
import ResourceCard from "../../ui/ResourceCard";
import { IntResource, IntUser } from "../../../types";
import { MemoryRouter } from "react-router";
import CtxUser from "../../../context";
import { PropsContext } from "../../../context";
import { vi, test, expect } from "vitest";

const resourceMock = {
  id: 1,
  title: "React Basics",
  description: "Learn React step-by-step",
  type: "Video",
  created_at: "1 abril de 2023",
  like_count: 22,
  bookmark_count: 5,
  comment_count: 10,
} as IntResource;

const userContextMock: PropsContext = {
  user: { id: 123, displayName: "Test User", photoURL: undefined } as IntUser,
  isAuthenticated: true,
  saveUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  error: null,
  setError: vi.fn(),
};

interface RenderWithUserContextProps {
  ui: React.ReactElement;
  contextValue?: PropsContext;
}

const renderWithUserContext = (
  ui: RenderWithUserContextProps["ui"],
  contextValue: RenderWithUserContextProps["contextValue"] = userContextMock,
): ReturnType<typeof render> => {
  return render(
    <MemoryRouter>
      <CtxUser.Provider value={contextValue}>{ui}</CtxUser.Provider>
    </MemoryRouter>,
  );
};

test("renders title and description with zero counts", () => {
  renderWithUserContext(
    <ResourceCard
      resource={{
        ...resourceMock,
        like_count: 0,
        bookmark_count: 0,
        comment_count: 0,
      }}
    />,
  );

  expect(screen.getByText("React Basics")).toBeInTheDocument();
  expect(screen.getByText("Learn React step-by-step")).toBeInTheDocument();

  const allZeros = screen.getAllByText("0");
  expect(allZeros.length).toBeGreaterThan(0);
});

test("displays correct title and description", () => {
  renderWithUserContext(<ResourceCard resource={resourceMock} />);
  expect(screen.getByText("React Basics")).toBeInTheDocument();
  expect(screen.getByText("Learn React step-by-step")).toBeInTheDocument();
});

test("displays resource type", () => {
  renderWithUserContext(<ResourceCard resource={resourceMock} />);
  expect(screen.getByText("Video")).toBeInTheDocument();
});

test("bookmark icon is clickable when user is logged in", () => {
  const toggleBookmarkMock = vi.fn();
  renderWithUserContext(
    <ResourceCard
      resource={resourceMock}
      isBookmarked={false}
      toggleBookmark={toggleBookmarkMock}
    />,
  );

  const bookmarkContainer = screen.getByTestId("bookmarkIcon");
  bookmarkContainer.click();

  expect(toggleBookmarkMock).toHaveBeenCalledWith(resourceMock);
});

test("bookmark icon is not clickable when user is not logged in", () => {
  const toggleBookmarkMock = vi.fn();
  const noUserContextMock = {
    ...userContextMock,
    user: null,
    isAuthenticated: false,
  };

  renderWithUserContext(
    <ResourceCard
      resource={resourceMock}
      isBookmarked={false}
      toggleBookmark={toggleBookmarkMock}
    />,
    noUserContextMock,
  );

  const bookmarkContainer = screen.getByTestId("bookmarkIcon");
  bookmarkContainer.click();

  expect(toggleBookmarkMock).not.toHaveBeenCalled();
});
