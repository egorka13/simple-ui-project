import { Component } from '@angular/core';
import { BoardSettingsService } from '@services/board-settings.service';
import { GridSettingsService } from '@services/grid-settings.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sui-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
/**
 * @class - A controller class that describes the operation of the site header component
 */
export class HeaderComponent {
    //Property showing the state of the main screen grid
    public gridState: boolean = this.gridSettingsService.gridStatus;

    /**
     * Method that returns the path to the grid icon
     * @see HeaderComponent.gridState
     * @returns Method that returns the path to the grid icon depending on whether the option is enabled
     */
    public getGridPath(): string {
        const iconPath = '../../../assets/icons/header/';
        return this.gridState ? iconPath + 'header-grid-btn.svg' : iconPath + 'header-grid-none.svg';
    }

    /**
     * The method switches the state of the grid through a special service
     * @see BoardSettingsService
     * @see GridSettingsService
     */
    public onClickSetGridState(): void {
        this.gridState = !this.gridState;
        this.gridSettingsService.setGridStatus(this.gridState);
    }

    /**
     * A method that rounds the approximation parameter to the correct integer value. This is done due to the fact that when changing the scale,
     * a decimal number is returned, varying in the range from 1 to 2
     * @returns Returns the updated value of the scale exponent
     */
    public getRounderScale(): number {
        if (this.router.url === '/lib') {
            return 100;
        }
        return Math.round(this.boardSettingsService.scale * 100);
    }

    constructor(
        public boardSettingsService: BoardSettingsService,
        public gridSettingsService: GridSettingsService,
        private router: Router
    ) {}

    /**
     * Auxiliary element responsible for the exit of the scale indicator beyond the boundaries of 0.3 and 2
     * @param value - scale input parameter
     * @returns - returns the correct value (if the value is more than 2, it will return 2, for values less than 0.3 - 0.3, respectively
     */
    private checkValidValue(value: number): number {
        if (value > 2) {
            return 2;
        }
        if (value < 0.3) {
            return 0.3;
        }
        return value;
    }

    /**
     * The method responsible for changing the scale when entering a value in the corresponding header field
     * @param event Parameter required to identify the element
     */
    onChangeInput(event: Event): void {
        const targetInput: HTMLInputElement = event.target as HTMLInputElement;
        const currentValue: number = Number(targetInput.value) / 100;
        this.boardSettingsService.setScale(this.checkValidValue(currentValue));
    }

    /**
     * Method responsible for clearing the input field on click
     * @param event Parameter required to identify the element
     */
    onClickInput(event: Event): void {
        const targetInput: HTMLInputElement = event.target as HTMLInputElement;
        targetInput.value = '';
    }

    /**
     * The method responsible for adding and clearing incorrect values in the input field of the scale value
     * @param event Parameter required to identify the element
     */
    onKeyUpInput(event: Event): void {
        const targetInput: HTMLInputElement = event.target as HTMLInputElement;
        targetInput.value = targetInput.value.replace(/[^0-9%]/gi, '');
    }

    /**
     * Changes the zoom value by 10% towards the positive side (enlargement)
     */
    onClickZoomIn(): void {
        this.boardSettingsService.changeScale(1);
    }

    /**
     * Changes the zoom value by 10% towards the negative side (farther)
     */
    onClickZoomOut(): void {
        this.boardSettingsService.changeScale(-1);
    }
}
