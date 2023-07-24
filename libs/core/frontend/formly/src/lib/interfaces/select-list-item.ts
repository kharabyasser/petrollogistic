export interface SelectListItem {
    id: string | number;
    code: string,
    description: string;
    isActive?: boolean;
    attributes?: {
      [key: string]: string | number | number[];
    };
  }
  
  export enum SelectListItemViewMode {
    CODE = 'CODE',
    CODE_DESCRIPTION = 'CODE_DESCRIPTION',
    DESCRIPTION = 'DESCRIPTION',
    DESCRIPTION_OR_CODE = 'DESCRIPTION_OR_CODE'
  }
  
  export enum SelectListUpdateEventType {
    OPTIONS_LIST_UPDATE = 'options_list_update'
  }
  