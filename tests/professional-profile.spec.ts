import {test,expect} from '@playwright/test';

test('confirmed biography replaces the two-person introduction without invented credentials',async({page})=>{
 await page.goto('/');
 const profile=page.locator('.professional-profile');
 for(const text of ['ボストン大学','経済学の学位','スターティングゲート・ファンド','アシスタント','シーメイト','ステラ・キャピタル','デロイト・コンサルティング','財務モデリング']) await expect(profile).toContainText(text);
 await expect(page.locator('.brother-intro-panel')).toHaveCount(0);
 await expect(page.locator('.hero-experience')).not.toContainText(/11年|3年/);
 await expect(page.locator('.profile-guide .bot-ocean')).toBeVisible();
 await expect(page.locator('.profile-biography .catalog-cta')).toHaveAttribute('href','#contact');
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
