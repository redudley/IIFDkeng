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
                                "3f7", "3f6", "3f5", "3f4", "3f3", "3f2", "3f1",
                                "3e7", "3e6", "3e5", "3e4", "3e3", "3e2", "3e1",
                                "3d7", "3d6", "3d5", "3d4", "3d3", "3d2", "3d1",
                                "3c7", "3c6", "3c5", "3c4", "3c3", "3c2", "3c1",
                                "3b7", "3b6", "3b5", "3b4", "3b3", "3b2", "3b1",
                                "3a7", "3a6", "3a5", "3a4", "3a3", "3a2", "3a1",
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
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

// ========== START OF CODE TO COPY INTO YOUR DATA FILE ==========
var IMAGES_TO_PRELOAD = [

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions

    "https://imgur.com/PTn3jIN.png", // 8-0c1s-control
    "https://imgur.com/xXIconM.png", // 8-0c2s-control
    "https://imgur.com/USp5nm3.png", // 8-1c3s-control
    "https://imgur.com/zTHOZJg.png", // 8-2c1s-control
    "https://imgur.com/bk685Bb.png", // 8-3c1s-control
    "https://imgur.com/JwwC2C4.png", // 8-3c3s-control

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

      //list1 - premises canonical order / three or every / trial order B / image order A
          //trials: 1 block:  1002, 1118, 1142, 1024, 1070, 1140, 1036,
          //        2 block:  1032, 1086, 1124, 1012, 1132, 1102, 1048,
          //        3 block:  1134, 1120, 1058, 1128, 1076, 1038, 1090,
          //        4 block:  1137, 1116, 1042, 1129, 1054, 1100, 1014,
          //        5 block:  1108, 1068, 1125, 1064, 1143, 1026, 1096,
          //        6 block:  1052, 1008, 1121, 1078, 1018, 1084, 1135

      ["3a1",   //1002-canonical-disj-Bfirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["3a2",   //1118-onlyP1-disj-Bfirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["3a3",   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["3a4",   //1024-canonical-disj-Bfirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["3a5",   //1070-canonical-disj-Bfirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["3a6",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["3a7",   //1036-canonical-disj-Bfirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["3b1",   //1032-canonical-disj-Bfirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["3b2",   //1086-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["3b3",   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["3b4",   //1012-canonical-disj-Bfirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["3b5",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["3b6",   //1102-onlyP1-disj-Bfirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["3b7",   //1048-canonical-disj-Bfirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["3c1",   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["3c2",   //1110-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["3c3",   //1058-canonical-disj-Bfirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["3c4",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["3c5",   //1076-canonical-disj-Bfirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["3c6",   //1038-canonical-disj-Bfirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["3c7",   //1090-onlyP1-disj-Bfirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["3d1",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["3d2",   //1116-onlyP1-disj-Bfirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["3d3",   //1042-canonical-disj-Bfirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}],
      ["3d4",   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/EhOp8QM.png"]]}],
      ["3d5",   //1054-canonical-disj-Bfirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["3d6",   //1100-onlyP1-disj-Bfirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"],
                                          ["K","https://imgur.com/eQh40x2.png"]]}],
      ["3d7",   //1014-canonical-disj-Bfirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],
      ["3e1",   //1108-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["3e2",   //1068-canonical-disj-Bfirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["3e3",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["3e4",   //1064-canonical-disj-Bfirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"],
                                          ["K","https://imgur.com/KduS46H.png"]]}],
      ["3e5",   //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["3e6",   //1026-canonical-disj-Bfirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"],
                                          ["K","https://imgur.com/EhOp8QM.png"]]}],
      ["3e7",   //1096-onlyP1-disj-Bfirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/M6bF0FW.png"]]}],
      ["3f1",   //1052-canonical-disj-Bfirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["3f2",   //1008-canonical-disj-Bfirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"],
                                          ["K","https://imgur.com/mKarxSv.png"]]}],
      ["3f3",   //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["3f4",   //1078-canonical-disj-Bfirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"],
                                          ["K","https://imgur.com/mnzhSDj.png"]]}],
      ["3f5",   //1018-canonical-disj-Bfirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"],
                                          ["K","https://imgur.com/zIUwK4N.png"]]}],
      ["3f6",   //1084-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"],
                                          ["K","https://imgur.com/d9htci3.png"]]}],
      ["3f7",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"],
                                          ["K","https://imgur.com/VAObTsD.png"]]}],

];
