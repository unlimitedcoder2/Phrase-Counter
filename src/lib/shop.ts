import { ShopItem } from "../types/config";

export class Shop {

	// double the fun.
	public items: {[key: string]: ShopItem[]};

	constructor(pages: {[key: string]: ShopItem[]}) {
		this.items = pages;
	}

	/**
	 * Get the desired items in a catalog page.
	 * @param page
	 */
	public getCatalogPage(page: number | string) : ShopItem[] {
		page = page.toString();
		// If the page is not created return an invalid item,
		// should possibly add error handling so empty arrays don't get sent through?
		// But it's most likely not needed since shop pages are created in the config.json so as long as
		// I don't do something stupid this should be fineeeee.
		return this.items[page] ? this.items[page] : [{ name: "", description: "", "price": -1 }];
	}	
}