const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Teemu Teekkari',
        username: 'teekkarius',
        password: 'yleinen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Welcome back, Matti Luukkainen!')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      const locator = page.getByText('blogs')
      await expect(locator).toBeVisible()
      await createBlog(page, 'Create blogs', 'Matti Luukkainen', 'ayy.fi')
      await expect(page.getByText('Create blogs by Matti Luukkainen')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Create blogs', 'Matti Luukkainen', 'ayy.fi')
      await page.getByText('Create blogs by Matti Luukkainen').click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    describe('The user', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Create blogs', 'Matti Luukkainen', 'ayy.fi')
        await page.getByText('Create blogs by Matti Luukkainen').click()
      })

      test('can delete their own blog', async ({ page }) => {
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Create blogs by Matti Luukkainen')).not.toBeVisible()
        await expect(page.getByText('Blog removed successfully')).toBeVisible()
      })

      test('is the only one who can see the remove button on a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'teekkarius', 'yleinen')
        await expect(page.getByText('Welcome back, Teemu Teekkari!')).toBeVisible()
        await page.getByText('Create blogs by Matti Luukkainen').click()
        await expect(page.getByText('like')).toBeVisible()
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
  })
})