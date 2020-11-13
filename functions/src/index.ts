import * as functions from 'firebase-functions';
import _shuffle from 'lodash/shuffle';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const deck = [['1','R'],['2','R'],['3','R'],['4','R'],['5','R'],['6','R'],['7','R'],['8','R'],['9','R'], ['1','B'],['2','B'],['3','B'],['4','B'],['5','B'],['6','B'],['7','B'],['8','B'],['9','B'], ['1','G'],['2','G'],['3','G'],['4','G'],['5','G'],['6','G'],['7','G'],['8','G'],['9','G'], ['1','P'],['2','P'],['3','P'],['4','P'],['5','P'],['6','P'],['7','P'],['8','P'],['9','P'], ['1','Y'],['2','Y'],['3','Y'],['4','Y'],['5','Y'],['6','Y'],['7','Y'],['8','Y'],['9','Y'], ['1','D'],['2','D'],['3','D'],['4','D'],['5','D'],['6','D'],['7','D'],['8','D'],['9','D']]

export const shuffleDeckOnCreate = functions.database.ref('/gamerooms/{gameroomId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const gameroom = snapshot.val();
      console.log('LOG', context.params.gameroomId, gameroom);
      const shuffledDeck = _shuffle(deck)
      console.log('shuffledDeck', shuffledDeck);
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.update({deck: shuffledDeck})
      }
    )
