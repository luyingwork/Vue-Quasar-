export default {
  car: {
    kind: 'car',
    title: 'Guarantee a replacement car',
    description: '',
    initPrice: '2.95',
    upgradeItemList: [
      {
        type: 'item',
        label: 'Legal Assistance',
        initStep: 'checked',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Non Fault Accident',
        initStep: 'checked',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Fault Accident',
        initStep: 'Subject to availability',
        middleStep: '14 days',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Single Vehicle Accident',
        initStep: 'Subject to availability',
        middleStep: '14 days',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Accident with an Uninsured Driver',
        initStep: '',
        middleStep: '14 days',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Vandalism',
        initStep: '',
        middleStep: '14 days',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Written Off',
        initStep: '',
        middleStep: '14 days',
        lastStep: 'checked'
      },
      {
        type: 'budget',
        label: '',
        initStep: 'FREE',
        middleStep: '2.95',
        lastStep: '10.18'
      }
    ]
  },
  cover: {
    kind: 'cover',
    title: 'Enhance your breakdown cover',
    description: '',
    initPrice: '3.97',
    upgradeItemList: [
      {
        type: 'item',
        label: 'Roadside',
        initStep: 'checked',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Onward Travel',
        initStep: 'checked',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Callouts',
        initStep: '2',
        middleStep: 'UNLIMITED',
        lastStep: 'UNLIMITED'
      },
      {
        label: 'Callouts Excess',
        initStep: '£20',
        middleStep: 'FREE',
        lastStep: 'FREE'
      },
      {
        type: 'item',
        label: 'Homestart',
        initStep: '',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Overnight accommodation',
        initStep: '',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Caravan recovery',
        initStep: '',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'Wheel charges',
        initStep: '',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'item',
        label: 'EU cover',
        initStep: '',
        middleStep: 'checked',
        lastStep: 'checked'
      },
      {
        type: 'budget',
        label: '',
        initStep: 'FREE',
        middleStep: '3.97',
        lastStep: '8.65'
      }
    ]
  }
}
