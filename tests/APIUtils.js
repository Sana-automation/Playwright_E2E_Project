class APIUtils {
  async getToken() {
    const loginResponse = await apiContext.post(
      "https://rahulshettyacademy.com/client",
      {
        data: loginPayload,
      }
    );
    expect(loginResponse.ok()).tobeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    return token;
  }
}
