import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  moveItemInArray,
} from '@angular/cdk/drag-drop';

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
  @ViewChild('contextMenu') contextMenuRef!: ElementRef;
  @ViewChild('contextMenuVisibleAddPage')
  contextMenuRefAddPage!: ElementRef;

  protected title = 'Tabs';

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
    {
      index: 3,
      pageId: 4,
      title: 'Ending',
      active: false,
      icon: icons.lightbulb,
    },
  ];

  contextMenuVisible = false;
  contextMenuVisibleAddPage = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextPage: Page | null = null;
  hoveredGap: number | null = null;

  public onSelectPage(pageId: number): void {
    const pageClicked = this.pages.find((el) => el.pageId === pageId);

    if (pageClicked?.active) {
      return;
    }

    this.pages.forEach((page) => (page.active = page.pageId === pageId));
  }

  public onClick(
    event: MouseEvent,
    page: Page,
    target: EventTarget | null
  ): void {
    event.preventDefault();
    event.stopPropagation();

    if (!(target instanceof HTMLElement)) return;

    const rect = target.getBoundingClientRect();

    this.contextMenuX = rect.left - 70;
    this.contextMenuY = rect.top - 260;
    this.contextPage = page;
    this.contextMenuVisible = true;
    this.contextMenuVisibleAddPage = false;
  }

  public onGapHover(index: number): void {
    this.hoveredGap = index;
  }

  public onGapLeave(): void {
    this.hoveredGap = null;
  }

  public onGapClick(event: MouseEvent, target: EventTarget | null): void {
    event.preventDefault();
    event.stopPropagation();

    if (!(target instanceof HTMLElement)) return;

    const rect = target.getBoundingClientRect();

    this.contextMenuX = rect.left - 100;
    this.contextMenuY = rect.top - 218;
    this.contextMenuVisibleAddPage = true;
    this.contextMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.contextMenuRef?.nativeElement?.contains(
      event.target
    );
    if (!clickedInside) {
      this.contextMenuVisible = false;
      this.contextMenuVisibleAddPage = false;
    }
  }
}
