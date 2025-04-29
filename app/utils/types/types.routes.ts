export type NavigateArgs = { params: { folderName: string } }

export type RootStackParamList = {
    initialParams: undefined
    home: undefined
    about: undefined
    folder: NavigateArgs

}
