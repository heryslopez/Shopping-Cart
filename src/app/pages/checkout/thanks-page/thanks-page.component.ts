import { Component} from '@angular/core';

@Component({
  selector: 'app-thanks-page',
  template: `
  <div class="container">
    <h1 class="title">thanks for shop!</h1>
    <p class="content">
        Your order is on the way!!!
    </p>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi magni autem, commodi vitae obcaecati repellendus officiis eveniet alias id.</span>
</div>
`,
  styleUrls: ['./thanks-page.component.scss']
})
export class ThanksPageComponent{
}
