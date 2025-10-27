import { test, expect } from '@playwright/test';

const MOCK_HEROES_LIST = {
  data: {
    total: 2,
    results: [
      { id: 1011334, name: '3-D Man', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: 'jpg' } },
      { id: 1017100, name: 'A-Bomb (HAS)', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16', extension: 'jpg' } },
    ]
  }
};

const MOCK_HULK_SEARCH = {
  data: {
    total: 1,
    results: [
      { id: 1009351, name: 'Hulk', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0', extension: 'jpg' } }
    ]
  }
};

const MOCK_3DMAN_DETAILS = {
  data: {
    results: [
      {
        id: 1011334,
        name: '3-D Man',
        description: 'O herói 3D de teste',
        comics: { available: 12 },
        series: { available: 3 },
        thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: 'jpg' }
      }
    ]
  }
};

const MOCK_3DMAN_COMICS = {
  data: {
    results: [
      { id: 1, title: 'Primeiro Quadrinho', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: 'jpg' } },
      { id: 2, title: 'Segundo Quadrinho', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: 'jpg' } }
    ]
  }
};


test.beforeEach(async ({ page }) => {
  // Intercepta TODAS as chamadas para a API de personagens
  await page.route('https://gateway.marvel.com/v1/public/characters**', async (route) => {
    const url = route.request().url();

    // 1. Se for uma busca por "Hulk"
    if (url.includes('nameStartsWith=Hulk')) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_HULK_SEARCH) });

      // 2. Se for uma busca pelo ID do 3-D Man (para a página de detalhes)
    } else if (url.includes('/1011334/comics')) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_3DMAN_COMICS) });

      // 3. Se for os detalhes do 3-D Man
    } else if (url.includes('/1011334')) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_3DMAN_DETAILS) });

      // 4. Se for qualquer outra chamada (a carga inicial)
    } else {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_HEROES_LIST) });
    }
  });
});


test('deve buscar por um herói e exibir resultados', async ({ page }) => {
  await page.goto('/');

  // 1. Espera os heróis iniciais (do mock) aparecerem
  await expect(page.getByText('3-D Man')).toBeVisible();
  await expect(page.getByText('A-Bomb (HAS)')).toBeVisible();

  // 2. Realiza a busca
  await page.getByPlaceholder('Procure por heróis').fill('Hulk');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // 3. Verifica se o resultado da busca (do mock) apareceu
  await expect(page.getByText('Hulk')).toBeVisible();

  // 4. Verifica se os heróis iniciais desapareceram
  await expect(page.getByText('3-D Man')).not.toBeVisible();
});

test('deve navegar para a página de detalhes ao clicar em um card', async ({ page }) => {
  await page.goto('/');

  // 1. Espera o mock inicial carregar e clica no "3-D Man"
  await page.getByText('3-D Man').click();

  // 2. Verifica se a URL está correta
  await expect(page).toHaveURL(/.*\/hero\/1011334/);

  // 3. Verifica se os detalhes (do mock) estão na página
  await expect(page.getByRole('heading', { name: '3-D MAN' })).toBeVisible();
  await expect(page.getByText('O herói 3D de teste')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Últimos lançamentos' })).toBeVisible();
  await expect(page.getByText('Primeiro Quadrinho')).toBeVisible();
});

test('deve favoritar e desfavoritar um herói', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // 1. Espera os heróis (do mock) carregarem
  await expect(page.getByText('3-D Man')).toBeVisible();
  await expect(page.getByText('A-Bomb (HAS)')).toBeVisible();

  // 2. Encontra o card do "3-D Man" e favorita
  const heroCard = page.locator('.character-card', { hasText: '3-D Man' });
  await heroCard.locator('.fav-icon').click();

  // 3. Clica no filtro de favoritos
  await page.getByText('Somente favoritos').click();

  // 4. Verifica se SÓ o "3-D Man" está visível
  await expect(page.getByText('3-D Man')).toBeVisible();
  await expect(page.getByText('A-Bomb (HAS)')).not.toBeVisible();

  // 5. Desfavorita
  await heroCard.locator('.fav-icon').click();

  // 6. Verifica se ele sumiu da lista de favoritos
  await expect(page.getByText('3-D Man')).not.toBeVisible();
});