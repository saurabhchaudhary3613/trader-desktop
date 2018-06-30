import * as React from 'react';
import { VisibilityFilter } from '../../../domain/types';
import { MiniRadio } from '../../basics/mini-radio';

export class VisibilitySelector extends React.Component<
    { selectedFilter: string; setValue: any },
    {}
> {
    filters = Object.values(VisibilityFilter);
    handleChange = (event: any) => {
        this.props.setValue(event.target.value);
    };

    render() {
        return this.filters.map(item => (
            <MiniRadio
                key={item}
                handleChange={this.handleChange}
                value={item}
                selectedValue={this.props.selectedFilter}
            />
        ));
    }
}
