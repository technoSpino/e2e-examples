import { AngularJSSelector } from 'testcafe-angular-selectors';
import { Selector } from 'testcafe';

fixture `TestFixture`
    .page('https://angularjs.org');

test('add new item', async t => {
    await t
            .typeText(AngularJSSelector.byModel('todoList.todoText'), 'new item')
            .click(Selector('[value="add"]'))   
            .expect(AngularJSSelector.byRepeater('todo in todoList.todos').count).eql(3);

});