import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be blank', () => {
    page.navigateTo();
<<<<<<< HEAD
    expect(page.getParagraphText()).toContain('Start with Ionic UI Components');
=======
    expect(page.getParagraphText()).toContain('The world is your oyster.');
>>>>>>> branchB
  });
});
