exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('events').insert(
      {
        id: 1,
        date: '2017-01-19 16:00:00+00',
        title: 'Squadron Operation Assault on Sukhumi',
        short_description: `#### Situation

Russian forces have mounted an assault on Georgian territory quickly securing Sukhumi. British special forces are on the ground conducting covert surveillance. Russia have managed to get several key pieces of Air defence hardware into and around Sukhumi which pose a great problem to us. The CIA have managed to arrange the purchase of a couple of KH-58U's and MPU's from former eastern block countries, we hope to mount these to several Georgian SU-25T's - these munitions are in limited supply so SEAD will have to be conducted carefully.

`,
        description: `
### The mission

16AGR will be conducting a pincer attack from the North west and the east. There will be three elements to this attack.

A C-130K loaded with an SF task force will be escorted to Gudata airfield by 4 F-15's, these troops will secure the airfield enabling the F-15's to land. The Sukhumi AD should be too far to the east to cause you any issues however we are expecting the Russians to scramble aircraft to intercept.

Georgian SU-25T's will depart to conduct SEAD in Sukhumi city. Then the A10's will depart and conduct assault with the SU-25T's on two targets. The primary target is a military train that is loaded with hardware and set to leave from Sukhumi train yard soon.. We should be able to destroy this before it departs. The A-10C's must drop a GBU-12 onto the train to trigger its destruction. We are also interested in the destruction of the supply ships docked in sukhumi harbour - suggest this is a good target for SU-25's once the SEAD is complete.

US Helicopters entered Georgia under the cover of darkness last night and are will be staging 20nm to the east of sukhumi. These will be destroying key targets at Sukhumi airfield. We are particularly interested in these 4 helicopters and aircraft we have spotted on recon overflights.
`,
        image_url: 'http://www.defense.gouv.fr/var/dicod/storage/images/base-de-medias/images/air/site-2010-20xx/img-menu-principal/technologies/aeronefs/chasse/mirage-2000-b/1260378-1-fre-FR/mirage-2000-b.jpg'
      }),
  ]);
};
