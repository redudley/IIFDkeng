1009,// 'preload' should be the first item in the shuffle sequence so that images are preloaded
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
                                "24.01", "24.02", "24.03", "24.04", "24.05", "24.06", "24.07", "24.08", "24.09", "24.10",
                                "24.11", "24.12", "24.13", "24.14", "24.15", "24.16", "24.17", "24.18", "24.19", "24.20",
                                "24.21", "24.22", "24.23", "24.24", "24.25", "24.26", "24.27", "24.28", "24.29", "24.30",
                                "24.31", "24.32", "24.33", "24.34", "24.35", "24.36", "24.37", "24.38", "24.39", "24.40",
                                "24.41", "24.42", "24.43", "24.44", "24.45", "24.46", "24.47", "24.48", "24.49", "24.50",
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

      //list2 - premises canonical order / every or three / trial order A / image order B
          //trials: 1 block:  1147, 1130, 1041, 1160, 1065, 1117, 1033, 1122, 1053, 1137,
          //        2 block:  1103, 1077, 1152, 1027, 1135, 1071, 1107, 1156, 1133, 1061,
          //        3 block:  1132, 1081, 1011, 1111, 1045, 1144, 1051, 1145, 1023, 1141,
          //        4 block:  1005, 1091, 1085, 1125, 1099, 1001, 1031, 1075, 1113, 1157,
          //        5 block:  1140, 1059, 1123, 1150, 1037, 1015, 1093, 1019, 1128, 1153

      ["24.01",   //1147-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.02",   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.03",   //1041-canonical-disj-Afirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.04",   //1160-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.05",   //1065-canonical-disj-Afirst-someA-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.06",   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.07",   //1033-canonical-disj-Afirst-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.08",   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.09",   //1053-canonical-disj-Afirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.10",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.11",   //1103-onlyP1-disj-Afirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.12",   //1077-canonical-disj-Afirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.13",   //1152-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.14",   //1027-canonical-disj-Afirst-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["24.15",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.16",   //1071-canonical-disj-Afirst-someA-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.17",   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["24.18",   //1156-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.19",   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.20",   //1061-canonical-disj-Afirst-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.21",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.22",   //1081-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.23",   //1011-canonical-disj-Afirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.24",   //1111-onlyP1-disj-Afirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.25",   //1045-canonical-disj-Afirst-someA-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.26",   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.27",   //1051-canonical-disj-Afirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.28",   //1145-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.29",   //1023-canonical-disj-Afirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.30",   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.31",   //1005-canonical-disj-Afirst-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.32",   //1091-onlyP1-disj-Afirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.33",   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.34",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.35",   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.36",   //1001-canonical-disj-Afirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.37",   //1031-canonical-disj-Afirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.38",   //1075-canonical-disj-Afirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.39",   //1113-onlyP1-disj-Afirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.40",   //1157-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.41",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.42",   //1059-canonical-disj-Afirst-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.43",   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.44",   //1150-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["--K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.45",   //1037-canonical-disj-Afirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["--K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.46",   //1015-canonical-disj-Afirst-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["--K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.47",   //1093-onlyP1-disj-Afirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["--K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.48",   //1019-canonical-disj-Afirst-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["--K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.49",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["--K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.50",   //1153-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["--D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["--K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s



];
