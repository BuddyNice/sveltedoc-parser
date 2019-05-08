/**
 * Represents a data structure of JSDoc keywords, like a `@type {string}`
 */
export interface JSDocKeyword {
    /**
     * The name of keyword.
     * @example for `@param {string} Description of this property`, this field equals a `param`.
     */
    name: string;
    /**
     * The description of keyword.
     * @example for `@param {string} Description of this property`, this field equals a `{string} Description of this property`.
     */
    description: string;
}

export interface JSDocType {
    /**
     * Kind of this type.
     */
    kind: 'type'|'union'|'const',
    /**
     * The text representation of this type.
     */
    text: string,
    /**
     * The type representation of this item.
     * @see `'type'|'const'` in `kind` field, then this field provide the name of JS type.
     * @see `'union'` in `kind` field, then this field provide the list of @see JSDocType  
     */
    type: string|JSDocType[],
    /**
     * The constant value related to this type, if can be provided.
     */
    value?: any
}

/**
 * Represents a source location of symbol.
 */
export interface SourceLocation {
    /**
     * The symbol start offset from document beginning.
     */
    start: number;

    /**
     * The symbol end offset from document beginning.
     */
    end: number;
}

export interface ISvelteItem {
    /**
     * The name of the item.
     */
    name: string;

    /**
     * The source code location of this item.
     * Provided only if requested by specific option parameter.
     */
    loc?: SourceLocation;

    /**
     * The description of the item, provided from related comment.
     */
    description?: string|null;
    /**
     * The visibility of item.
     */
    visibility?: 'public'|'protected'|'private';
    /**
     * The list of parsed JSDoc keywords from related comment.
     */
    keywords?: JSDocKeyword[];
}

export interface SvelteDataItem extends ISvelteItem {
    /**
     * The JS type of property.
     */
    type?: JSDocType;
    /**
     * The default value of property, if provided.
     */
    value?: any
}

export interface SvelteComputedItem extends ISvelteItem {
    /**
     * The list of data or computed properties names, marked as depended to this property.
     */
    dependencies: string[]    
}

export interface SvelteMethodArgumentItem {
    /**
     * The name of method parameter.
     */
    name: string;
    /**
     * The JS type.
     */
    type: JSDocType;
    /**
     * Indicates, that this parameter is repeated.
     */
    repeated?: boolean;
    /**
     * Indicates, that this parameter is optional.
     */
    optional?: boolean;
    /**
     * The default value of optional parameter.
     */
    default?: string;
    /**
     * The description of the parameter.
     */
    description?: string;
}

export interface SvelteMethodItem extends ISvelteItem {
    /**
     * The list of parameter items for specified method.
     */
    args?: SvelteMethodArgumentItem[]
}

export interface SvelteComponentItem extends ISvelteItem {
    /**
     * The relative path to improted component.
     */
    value: string;
}

export interface SvelteEventItem extends ISvelteItem {
    /**
     * The name of HTML element if propagated standart JS Dom event or null.
     */
    parent?: string|null;
}

/**
 * The exposed slot parameter.
 * @since Svelte V3
 * @since {2.0.0}
 */
export interface SvelteSlotParameter extends ISvelteItem {

}

export interface SvelteSlotItem extends ISvelteItem {
    /**
     * List of exposed slot parameters.
     * @since Svelte V3
     * @since {2.0.0}
     */
    parameters?: SvelteSlotParameter[];
}

export interface SvelteRefItem extends ISvelteItem {
    /**
     * The name of HTML element or component that binded with this ref name.
     */
    parent?: string|null;
}

/**
 * Represents a Svelte component documentation object.
 */
export interface SvelteComponentDoc {
    /**
     * The name of the parsed component.
     */
    name?: string|null;
    /**
     * The Svelte compiler version that used for this document.
     */
    version?: number,
    /**
     * The component description.
     */
    description?: string|null;

    /**
     * The list of defined model properties.
     */
    data?: SvelteDataItem[];
    /**
     * The list of defined computed properties of component.
     */
    computed?: SvelteComputedItem[];
    
    /**
     * The list of included components.
     */
    components?: SvelteComponentItem[];
    /**
     * The list of fired events from parsed component.
     */
    events?: SvelteEventItem[];
    /**
     * The list of provided slots.
     */
    slots?: SvelteSlotItem[];
    /**
     * The list of references to nodes and components.
     */
    refs?: SvelteRefItem[];

    /**
     * The list of attached methods.
     */
    methods?: SvelteMethodItem[];
    /**
     * The list of attached actions.
     */
    actions?: SvelteMethodItem[];
    /**
     * The list of attached helpers.
     */
    helpers?: SvelteMethodItem[];
    /**
     * The list of transition methods to animate DOM elements.
     */
    transitions?: SvelteMethodItem[];
}