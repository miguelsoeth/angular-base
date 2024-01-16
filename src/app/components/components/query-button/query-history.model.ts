export interface QueryHistoryModel {
    username: string
    type: string
    document: string
    referredDate: string
    interval: string
    interval_label: string
}

export interface QueryHistoryResponse {
    id?: number;
    username: string;
    querydate: string;
    type: string;
    document?: string;
    referreddate: string;
    interval?: string;
    interval_label: string;
  }
  