import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, searchProperty: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        return items.filter(item => {
            return Object.keys(item).some(key => {
                console.log('searchProperty:', searchProperty);
                if (searchProperty) {
                    return (
                        key === searchProperty &&
                        String(item[key]).toLowerCase().includes(searchText.toLowerCase())
                    );
                }
                return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
            });
        });
    }
}
