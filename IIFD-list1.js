// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(//"intro",
                              "preload",
                            //  "taskdescrip",
                            //  "famknown",
                            //  "singleprem",
                              //randomize("prac_single"),
                            //  "doubleprem",
                            //  randomize("prac_double"),
                            //  "start",
                                "test"
                            );

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "NextMessage", {hideProgressBar: true,
    },
    "PracticeMessage", {hideProgressBar: true,
    },
    "StartMessage", {hideProgressBar: true,
    },
    "PictureAccept", {
      hideProgressBar: true,
      randomOrder: false
    },
    "Question", {
        hideProgressBar: true,
        hasCorrect: false,
        randomOrder: false
    },
    "FlashSentence", {
        hideProgressBar: true,
        timeout: 5000
    },
    "MyDashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "DashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "Message", {
        hideProgressBar: true,
        transfer: "keypress"
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

// ========== START OF CODE TO COPY INTO YOUR DATA FILE ==========
var IMAGES_TO_PRELOAD = [
    //put familiarization trials in

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions
    "https://imgur.com/2jFy0F3.png", // 8-3+c0s -  every-circle,                 unknown condition
    "https://imgur.com/VXyqEVR.png", // 8-0c2+s -  three-square,                 unknown condition

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions
    "https://imgur.com/GQq24EB.png", // 8-0c3+s -  every-square,                 unknown condition
    "https://imgur.com/Tj0Y7Ee.png", // 8-2+c0s -  three-circle,                 unknown condition

    "https://imgur.com/PTn3jIN.png", // 8-0c1s-control
    "https://imgur.com/xXIconM.png", // 8-0c2s-control
    "https://imgur.com/USp5nm3.png", // 8-1c3s-control
    "https://imgur.com/zTHOZJg.png", // 8-2c1s-control
    "https://imgur.com/bk685Bb.png", // 8-3c1s-control
    "https://imgur.com/JwwC2C4.png", // 8-3c3s-control
    "https://imgur.com/LTarzxJ.png", // 8-2c1+s-control
    "https://imgur.com/u22f9u1.png", // 8-3+c0s-control

];

define_ibex_controller({
    name: "Preloader",
    jqueryWidget: {
        _init: function () {
            this.element.append("Loading images...");

            this.preloadedImages = [ ];
            var numToPreload = IMAGES_TO_PRELOAD.length;
            for (var i = 0; i < IMAGES_TO_PRELOAD.length; ++i) {
                var img = new Image();
                img.src = IMAGES_TO_PRELOAD[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
        }
    },
    properties: {
        countsForProgressBar: false
    }
});
// ========= END OF CODE TO COPY INTO YOUR DATA FILE ==========

var items = [

    // Define the 'preload' item.
    ["preload", "Preloader", { }],

    ["sep", "Separator", { }],

    ["setcounter", "__SetCounter__", { }],

    ["taskdescrip","NextMessage", {html: {include: 'iifd_task.html'}}],

    ["famknown","NextMessage", {html: {include: 'iifd_known_sample.html'}}],

    ["singleprem","PracticeMessage", {html: {include: 'iifd_introduce_single.html'}}],

    ["doubleprem","PracticeMessage", {html: {include: 'iifd_introduce_double.html'}}],

    ["start","StartMessage", {html: {include: 'iifd_start.html'}}],

    // need "prac_double" items - have one premise

    // need "prac_double" items - have two premises

      // condition names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      //list1 - premises canonical order / every or three / trial order A / image order A
          //trials: A block:  1001, 1117, 1142, 1023, 1069, 1140, 1035,
          //        B block:  1031, 1085, 1124, 1011, 1132, 1101, 1047,
          //        C block:  1134, 1109, 1057, 1128, 1075, 1037, 1089,
          //        D block:  1137, 1115, 1041, 1129, 1053, 1099, 1013,
          //        E block:  1107, 1067, 1125, 1063, 1143, 1025, 1095,
          //        F block:  1051, 1007, 1121, 1077, 1017, 1083, 1135

      ["test",   //1001-canonical-disj-Afirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["test",   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["test",   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["test",   //1023-canonical-disj-Afirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["test",   //1069-canonical-disj-Afirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["test",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["test",   //1035-canonical-disj-Afirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["test",   //1031-canonical-disj-Afirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["test",   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["test",   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["test",   //1011-canonical-disj-Afirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["test",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["test",   //1101-onlyP1-disj-Afirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["test",   //1047-canonical-disj-Afirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["test",   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["test",   //1109-onlyP1-disj-Afirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["test",   //1057-canonical-disj-Afirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["test",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["test",   //1075-canonical-disj-Afirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["test",   //1037-canonical-disj-Afirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["test",   //1089-onlyP1-disj-Afirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["test",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["test",   //1115-onlyP1-disj-Afirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["test",   //1041-canonical-disj-Afirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["test",   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/EhOp8QM.png"]]}],
      ["test",   //1053-canonical-disj-Afirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["test",   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["test",   //1013-canonical-disj-Afirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["test",   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["test",   //1067-canonical-disj-Afirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["test",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["test",   //1063-canonical-disj-Afirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["test",   //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["test",   //1025-canonical-disj-Afirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/EhOp8QM.png"]]}],
      ["test",   //1095-onlyP1-disj-Afirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["test",   //1051-canonical-disj-Afirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["test",   //1007-canonical-disj-Afirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["test",   //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["test",   //1077-canonical-disj-Afirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["test",   //1017-canonical-disj-Afirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["test",   //1083-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["test",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],

];
