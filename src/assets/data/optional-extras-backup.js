export default [
  {
    caption: 'guarantee',
    title: 'Guarantee a replacement car',
    description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.',
    initPrice: '2.95',
    type: 'one',
    upgradeStep: [
      {
        step: 'first',
        label: 'basic',
        subLabel: '',
        isMostPopular: false
      },
      {
        step: 'second',
        label: 'replacement car',
        subLabel: '',
        'isMostPopular': true
      }
    ],
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
    ],
    upgradeAction: [
      {
        label: 'upgrade',
        isSelected: true
      },
      {
        label: 'upgrade',
        isSelected: false
      },
      {
        label: 'upgrade',
        isSelected: false
      }
    ]
  },
  {
    caption: 'enhance',
    title: 'Enhance your breakdown cover',
    description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.',
    initPrice: '3.97',
    type: 'two',
    upgradeStep: [
      {
        step: 'first',
        label: 'basic',
        subLabel: 'Rescue',
        isMostPopular: false
      },
      {
        step: 'second',
        label: 'gold',
        subLabel: 'Rescue Plus & Home Start',
        'isMostPopular': true
      },
      {
        step: 'third',
        label: 'platinum',
        subLabel: 'Rescue Plus & Home Start',
        'isMostPopular': false
      }
    ],
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
    ],
    upgradeAction: [
      {
        label: 'upgrade',
        isSelected: true
      },
      {
        label: 'upgrade',
        isSelected: false
      },
      {
        label: 'upgrade',
        isSelected: false
      }
    ]
  }
]
