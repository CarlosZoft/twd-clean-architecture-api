import { UserData } from "../user-data";
import { InMemoryUserRepository } from "./in-memory-user-repository";

describe("In Memory User Repository", () => {
  test("should return null if user is not found", async () => {
    const users: UserData[] = [];
    const sut = new InMemoryUserRepository(users);
    const user = await sut.findUserByEmail("any@email.com");
    expect(user).toBeNull();
  });

  test("should return user if it is found in the repository", async () => {
    const users: UserData[] = [];
    const name = "any_name";
    const email = "any@email.com";
    const sut = new InMemoryUserRepository(users);
    await sut.add({ name, email });
    expect(users[0].name).toBe("any_name");
  });

  test("shold return all users in the repository", async () => {
    const users: UserData[] = [
      { name: "any_name", email: "any@email.com" },
      { name: "second_name", email: "secondAny@email.com" },
    ];
    const sut = new InMemoryUserRepository(users);
    const returnedUsers = await sut.findAllUsers();
    expect(returnedUsers.length).toBe(2);
  });
});
