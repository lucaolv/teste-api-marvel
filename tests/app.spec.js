import { test, expect } from '@playwright/test';

// Teste 1: Busca por um herói
test('deve buscar por um herói e exibir resultados', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Procure por heróis').fill('Hulk');
  await page.getByRole('button', { name: 'Buscar' }).click();

  const hulkCard = page.locator('.character-card', { hasText: /^Hulk$/ }).first();
  await expect(hulkCard).toBeVisible();
});

// Teste 2: Navegação para a página de detalhes
test('deve navegar para a página de detalhes ao clicar em um card', async ({ page }) => {
  await page.goto('/');

  await page.locator('.character-card').first().click();

  await expect(page).toHaveURL(/.*\/hero\/\d+/);

  await expect(page.getByRole('heading', { name: 'Últimos lançamentos' })).toBeVisible();
});

// Teste 3: Funcionalidade de Favoritos
test('deve favoritar e desfavoritar um herói', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const firstCard = page.locator('.character-card').first();
  const heroNameElement = firstCard.locator('h3.character-name'); //
  const heroName = await heroNameElement.textContent();

  await firstCard.locator('.fav-icon').click();

  await page.getByText('Somente favoritos').click();

  // Verificamos pelo nome exato do herói que favoritamos
  await expect(page.locator('.character-card', { hasText: heroName })).toBeVisible();

  // Para desfavoritar, encontramos o card novamente e clicamos no ícone
  const favoritedCard = page.locator('.character-card', { hasText: heroName });
  await favoritedCard.locator('.fav-icon').click();

  // O card não deve mais estar na lista de favoritos
  await expect(favoritedCard).not.toBeVisible();
});