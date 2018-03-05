// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(
                             "preload",
                             "taskdescrip",
                             "famknown",
                             "singleprem",
                              randomize("prac_single"),
                             "doubleprem",
                              randomize("prac_double"),
                             "start",
                                "57.01", "57.02", "57.03", "57.04", "57.05", "57.06", "57.07", "57.08", "57.09", "57.10",
                                "57.11", "57.12", "57.13", "57.14", "57.15", "57.16", "57.17", "57.18", "57.19", "57.20",
                                "57.21", "57.22", "57.23", "57.24", "57.25", "57.26", "57.27", "57.28", "57.29", "57.30",
                                "57.31", "57.32", "57.33", "57.34", "57.35", "57.36", "57.37", "57.38", "57.39", "57.40",
                                "57.41", "57.42", "57.43", "57.44", "57.45", "57.46", "57.47", "57.48", "57.49", "57.50",
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

    "https://imgur.com/szZ1mVE.png", // 8-1c2s-control
    "https://imgur.com/wkDVZgd.png", // 8-1c3s-control
    "https://imgur.com/zXTKjiQ.png", // 8-2c2s-control
    "https://imgur.com/yv9ULuj.png", // 8-4c4s-control


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

    ["prac_single", //every shape: choice between 4c4s (correct, left) and 2c2s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/wkDVZgd.png"], //4c4s - true
                                        ["K","https://imgur.com/zXTKjiQ.png"]]}],//2c2s - false
    ["prac_single", //three squares: choice between 1c3s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s - true
    ["prac_double", //one or four circles, every shape: choice between 4c4s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_one_circles_four_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/wkDVZgd.png"]]}], //4c4s - true
    ["prac_double", //two or three squares, two circles : choice between 2c2s (correct, left) and 1c3s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_two_squares_three_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_two_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zXTKjiQ.png"], //2c2s - true
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s- false


      // condition names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      //list1 - premises canonical order / every or three / trial order A / image order A
          //trials: 1 block:  1148, 1129, 1044, 1159, 1068, 1120, 1036, 1121, 1056, 1138,
          //        2 block:  1102, 1080, 1151, 1026, 1136, 1070, 1106, 1155, 1134, 1064,
          //        3 block:  1131, 1084, 1010, 1110, 1048, 1143, 1050, 1146, 1022, 1142,
          //        4 block:  1007, 1090, 1088, 1126, 1098, 1004, 1030, 1074, 1116, 1158,
          //        5 block:  1139, 1058, 1124, 1149, 1040, 1014, 1096, 1018, 1127, 1154

      ["57.01",   //1148-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["57.02",   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["57.03",   //1044-canonical-disj-Bfirst-someA-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["57.04",   //1159-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["57.05",   //1068-canonical-disj-Bfirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["57.06",   //1120-onlyP1-disj-Bfirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["57.07",   //1036-canonical-disj-Bfirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["57.08",  //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["57.09",  //1056-canonical-disj-Bfirst-someA-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["57.10",  //1138-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["57.11",  //1102-onlyP1-disj-Bfirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["57.12",   //1080-canonical-disj-Bfirst-someA-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["57.13",   //1151-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["57.14",   //1026-canonical-disj-Bfirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["57.15",   //1136-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["57.16",   //1070-canonical-disj-Bfirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["57.17",   //1106-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["57.18",   //1155-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["57.19",   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["57.20",   //1064-canonical-disj-Bfirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["57.21",   //1131-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["57.22",   //1084-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["57.23",   //1010-canonical-disj-Bfirst-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["57.24",    //1110-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["57.25",   //1048-canonical-disj-Bfirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s

      ["57.26",  //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["57.27",   //1050-canonical-disj-Bfirst-someA-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["57.28",   //1146-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["57.29",   //1022-canonical-disj-Bfirst-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["57.30",   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s

      ["57.31",  //1007-canonical-disj-Bfirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["57.32",    //1090-onlyP1-disj-Bfirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["57.33",   //1088-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["57.34",   //1126-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["57.35",   //1098-onlyP1-disj-Bfirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["57.36",   //1004-canonical-disj-Bfirst-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["57.37",   //1030-canonical-disj-Bfirst-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["57.38",   //1074-canonical-disj-Bfirst-someA-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["57.39",   //1116-onlyP1-disj-Bfirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["57.40",   //1158-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["57.41",   //1139-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["57.42",   //1058-canonical-disj-Bfirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["57.43",   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["57.44",   //1149-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["57.45",   //1040-canonical-disj-Bfirst-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["57.46",   //1014-canonical-disj-Bfirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["57.47",   //1096-onlyP1-disj-Bfirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["57.48",   //1018-canonical-disj-Bfirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["57.49",   //1127-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["57.50",   //1154-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s


];
