/**
 * Моковые данные для листинга плееров
 */

export const plaerRows = [
  {
    primaryKeyValue: '1', 
    columnValues: {
      id: {value: '1'},
      name: {value: 'Test 1'},
      is_active: {value: true},
      last_update: {value: "2022-10-05"},
      project_id: {value: '13'},
      guid: {value: ""},
    }
  },
  {
    primaryKeyValue: '2', 
    columnValues: {
      id: {value: '2'},
      name: {value: 'Test 2'},
      is_active: {value: true},
      last_update: {value: "2022-10-02"},
      project_id: {value: '13'},
      guid: {value: ""},
    }
  },
  {
    primaryKeyValue: '3', 
    columnValues: {
      id: {value: '3'},
      name: {value: 'Test 3'},
      is_active: {value: true},
      last_update: {value: "2020-09-05"},
      project_id: {value: '13'},
      guid: {value: ""},
    }
  }
];

export const additionData = [
  {
    id: '1',
    campaigns: {
      channel: {
        name: '7 colors'
      },
      uploadingStatus: 57,
    },
  },
  {
    id: '2',
    campaigns: {
      channel: {
        name: '77 colors'
      },
      uploadingStatus: 45,
    },
  },
  {
    id: '3',
    campaigns: {
      channel: {
        name: '37 colors'
      },
      uploadingStatus: 37,
    },
  },
];