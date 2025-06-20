import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Page {
  index: number;
  pageId: number;
  title: string;
  active: boolean;
  icon: string;
}

enum icons {
  circleuser = 'circle-user',
  comments = 'comments',
  handshake = 'handshake',
  clone = 'clone',
  gem = 'gem',
  lightbulb = 'lightbulb',
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'fillout';

  pages: Page[] = [
    {
      index: 0,
      pageId: 1,
      title: 'Info',
      active: true,
      icon: icons.circleuser,
    },
    {
      index: 1,
      pageId: 2,
      title: 'Details',
      active: false,
      icon: icons.gem,
    },
    {
      index: 2,
      pageId: 3,
      title: 'Other',
      active: false,
      icon: icons.comments,
    },
  ];

  public onSelectPage(pageId: number): void {
    const pageClicked = this.pages.find((el) => el.pageId === pageId);

    if (pageClicked?.active) {
      return;
    }

    this.pages.forEach((page) => (page.active = page.pageId === pageId));
  }
}
