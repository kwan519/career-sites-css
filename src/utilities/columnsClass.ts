export const GetColumnsClassFromTotal = (total: number) => {
    if(total < 2) return 'col-xs-12' //1
    if(total < 3) return 'col-sm-6 col-xs-12' //2
    if(total < 4) return 'col-sm-4 col-xs-12' //3
    if(total < 6) return 'col-lg-4 col-md-6 col-xs-12'
    if(total < 8) return 'col-lg-3 col-md-4 col-xs-12'
    if(total < 10) return 'col-lg-2 col-md-3 col-xs-12'
    return 'col-lg-2 col-md-3 col-xs-12'
}