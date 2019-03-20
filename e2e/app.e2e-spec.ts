import { AngularApiTestsPage } from './app.po';

describe('angular-api-tests App', function() {
  let page: AngularApiTestsPage;

  beforeEach(() => {
    page = new AngularApiTestsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
