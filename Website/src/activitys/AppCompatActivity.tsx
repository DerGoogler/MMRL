// import ToolbarBuilder, { ToolbarBuilderProps } from "@Builders/ToolbarBuilder";
// import { useDarkmode } from "@Hooks/useDarkmode";
// import { useNativeStorage } from "@Hooks/useNativeStorage";
// import { os } from "@Native/os";
// import React from "react";
// import { Page } from "react-onsenui";

// interface CompatActivityOptions<P = {}> {
//   props?: P;
//   setToolbarState?: React.Dispatch<React.SetStateAction<ToolbarBuilderProps>>;
// }

// interface CompatActivity<P = {}> {
//   /**
//    * Creates the activity
//    */
//   onCreate(opt?: CompatActivityOptions<P>): JSX.Element;
//   onCreateModal?(): JSX.Element;
//   onCreateBottomToolbar?(): JSX.Element;
//   onCreateToolbar: ToolbarBuilderProps;
//   onCreateFAB?(): JSX.Element;
//   onInit?(): void;
//   onShow?(): void;
//   onHide?(): void;
//   onInfiniteScroll?(): void;
//   pageModifier?: string;
//   pageStyle?: React.CSSProperties;
// }

// function CompatActivity<P = {}>(props: P, activity: CompatActivity<P>) {
//   const OnCreate = activity.onCreate;
//   const [toolbarStage, setToolbarStage] = React.useState<ToolbarBuilderProps>({
//     title: "Defualt",
//   });

//   // const [enabledBottomTabs, setEnabledBottomTabs] = useNativeStorage("enableBottomTabs_switch", false);
//   // const isDarkmode = useDarkmode();

//   // const darkColor: string = "#1f1f1f";
//   // const lightColor: string = "#4a148c";

//   // React.useEffect(() => {
//   //   os.setStatusBarColor(isDarkmode ? darkColor : lightColor, false);
//   //   if (enabledBottomTabs) {
//   //     os.setNavigationBarColor(isDarkmode ? darkColor : lightColor);
//   //   }
//   // }, [isDarkmode, enabledBottomTabs]);

//   return (
//     <>
//       <Page
//         style={activity.pageStyle}
//         modifier={activity.pageModifier}
//         renderBottomToolbar={activity.onCreateBottomToolbar}
//         renderFixed={activity.onCreateFAB}
//         renderModal={activity.onCreateModal}
//         onInfiniteScroll={activity.onInfiniteScroll}
//         onHide={activity.onHide}
//         onShow={activity.onShow}
//         onInit={activity.onInit}
//         renderToolbar={() => {
//           return <ToolbarBuilder {...toolbarStage} />;
//         }}
//       >
//         <OnCreate props={props} setToolbarState={setToolbarStage} />
//       </Page>
//     </>
//   );
// }

// // CompatActivity(
// //   {},
// //   {
// //     onCreateToolbar: {
// //       title: "fffff",
// //     },

// //     onCreate(opt) {
// //       return <></>;
// //     },
// //   }
// // );

// export default CompatActivity;
