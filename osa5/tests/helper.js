const loginWith = async (page, username, password)  => {
  await page.getByText('login').click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByText('new blog').click()
    await page.getByText('create new').waitFor()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create'}).click()
    await page.locator('li').filter({ hasText: title }).waitFor()
}

export { loginWith, createBlog }